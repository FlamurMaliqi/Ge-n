package gendev.resource;

import java.util.List;

import gendev.entity.StreamingPackageCoverageDTO;
import gendev.services.StreamingService;
import jakarta.annotation.PostConstruct;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/streaming")
public class StreamingRessource {
    
    @Inject
    StreamingService streamingService;

    private List<List<StreamingPackageCoverageDTO>> cachedCoverageList;

    @PostConstruct
    public void init() {
        List<String> allTeams = streamingService.getAllTeamNames();
        cachedCoverageList = streamingService.getPackageInformation(allTeams);
    }

    @GET
    @Path("/teams")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTeams() {
        List<String> teamNames = streamingService.getAllTeamNames();
        return Response.ok(teamNames).build();
    }

    @POST
    @Path("/packages")
    public Response generateCoverage(List<String> teams) {
        if (teams.contains("Alle Spiele")) {
            return Response.ok(cachedCoverageList).build();
        } else {
            List<List<StreamingPackageCoverageDTO>> coverageList = streamingService.getPackageInformation(teams);
            return Response.ok(coverageList).build();
        }
    }
}
