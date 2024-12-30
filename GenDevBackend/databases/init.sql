CREATE TABLE bc_game (
    id BIGSERIAL PRIMARY KEY,
    team_home VARCHAR(50),
    team_away VARCHAR(50),
    starts_at TIMESTAMP,
    tournament_name VARCHAR(100)
);

CREATE TABLE bc_streaming_package (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100),
    monthly_price_cents INTEGER,
    monthly_price_yearly_subscription_in_cents INTEGER
);

CREATE TABLE bc_streaming_offer (
    game_id BIGINT REFERENCES bc_game(id),
    streaming_package_id BIGINT REFERENCES bc_streaming_package(id),
    live BOOLEAN,
    highlights BOOLEAN
);

CREATE TABLE bc_streaming_package_coverage (
    streaming_package_id BIGINT REFERENCES bc_streaming_package(id),
    covered_game_ids TEXT
);

CREATE TABLE bc_streaming_package_game_mapping (
    streaming_package_id BIGINT REFERENCES bc_streaming_package(id),
    game_id BIGINT REFERENCES bc_game(id),
    PRIMARY KEY (streaming_package_id, game_id)
);

COPY bc_game(id, team_home, team_away, starts_at, tournament_name)
FROM '/docker-entrypoint-initdb.d/data/bc_game.csv' DELIMITER ',' CSV HEADER;

COPY bc_streaming_package(id, name, monthly_price_cents, monthly_price_yearly_subscription_in_cents)
FROM '/docker-entrypoint-initdb.d/data/bc_streaming_package.csv' DELIMITER ',' CSV HEADER;

COPY bc_streaming_offer(game_id, streaming_package_id, live, highlights)
FROM '/docker-entrypoint-initdb.d/data/bc_streaming_offer.csv' DELIMITER ',' CSV HEADER;

COPY bc_streaming_package_coverage(streaming_package_id, covered_game_ids)
FROM '/docker-entrypoint-initdb.d/data/restructured_bc_streaming_offer.csv' DELIMITER ',' CSV HEADER;

CREATE MATERIALIZED VIEW bc_combined_game_streaming_info_mv AS
SELECT 
    g.id AS game_id,
    g.team_home,
    g.team_away,
    g.starts_at,
    g.tournament_name,
    so.streaming_package_id,
    so.live,
    so.highlights,
    sp.name AS package_name,
    sp.monthly_price_cents,
    sp.monthly_price_yearly_subscription_in_cents
FROM 
    bc_game g
JOIN 
    bc_streaming_offer so ON g.id = so.game_id
JOIN 
    bc_streaming_package sp ON so.streaming_package_id = sp.id
ORDER BY 
    g.id, sp.id;

CREATE INDEX idx_team_streaming_package
ON bc_combined_game_streaming_info_mv (team_home, team_away, streaming_package_id);

CREATE INDEX idx_streaming_package_game_mapping
ON bc_streaming_package_game_mapping (streaming_package_id, game_id);

DROP TABLE IF EXISTS bc_streaming_package_coverage;

INSERT INTO bc_streaming_package_game_mapping (streaming_package_id, game_id)
SELECT 
    so.streaming_package_id, 
    g.id
FROM 
    bc_game g
JOIN 
    bc_streaming_offer so ON g.id = so.game_id;
