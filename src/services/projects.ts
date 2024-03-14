import { axiosInstance, endpoints } from "../utils/axios";

const ProjectsService = {
  actions: (uuid: string, payload: any) => {
    return axiosInstance.post(endpoints.projects.actions(uuid), payload);
  },
};

export default ProjectsService;
