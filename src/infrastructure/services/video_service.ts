import VideoUsecase from "../../usecases/video_usecase";
import VideoRepositoryImpl from "../repositories/video_repository_impl";

const repo = new VideoRepositoryImpl();
const VideoService = new VideoUsecase(repo);
export default VideoService;
