import { Composition } from "remotion";
import { VibeCodingVideo } from "./VibeCodingVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* TikTok / Instagram Reels / Stories — 9:16 Portrait */}
      <Composition
        id="VibeCodingVideo"
        component={VibeCodingVideo}
        durationInFrames={2310}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Instagram Post / Facebook — 1:1 Square */}
      <Composition
        id="VibeCodingSquare"
        component={VibeCodingVideo}
        durationInFrames={2310}
        fps={30}
        width={1080}
        height={1080}
      />

      {/* X (Twitter) — 16:9 Landscape */}
      <Composition
        id="VibeCodingLandscape"
        component={VibeCodingVideo}
        durationInFrames={2310}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
