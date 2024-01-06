import { axiosInstance, endpoints } from "../utils/axios";

const ProjectsService = {
  getProjectOfflineBeneficaries: (contractAddress: string) =>
    axiosInstance.get(
      endpoints.projects.getProjectOfflineBeneficaries(contractAddress)
    ),
};

export default ProjectsService;
