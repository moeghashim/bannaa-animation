import { Composition } from "remotion";
import { VibeCodingVideo } from "./VibeCodingVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="VibeCodingVideo"
      component={VibeCodingVideo}
      durationInFrames={2310}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
