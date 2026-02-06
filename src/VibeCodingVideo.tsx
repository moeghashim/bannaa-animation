import React from "react";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Intro } from "./Intro";
import { SectionScene } from "./SectionScene";
import { Outro } from "./Outro";
import {
  SECTIONS,
  INTRO_DURATION,
  SECTION_DURATION,
  TRANSITION_DURATION,
  FPS,
} from "./constants";

export const VibeCodingVideo: React.FC = () => {
  return (
    <TransitionSeries>
      {/* Intro */}
      <TransitionSeries.Sequence durationInFrames={INTRO_DURATION}>
        <Intro />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Sections */}
      {SECTIONS.map((section, i) => (
        <React.Fragment key={section.number}>
          <TransitionSeries.Sequence durationInFrames={SECTION_DURATION}>
            <SectionScene data={section} />
          </TransitionSeries.Sequence>

          {/* Transition between sections */}
          <TransitionSeries.Transition
            presentation={
              i % 2 === 0
                ? slide({ direction: "from-right" })
                : fade()
            }
            timing={linearTiming({
              durationInFrames: TRANSITION_DURATION,
            })}
          />
        </React.Fragment>
      ))}

      {/* Outro */}
      <TransitionSeries.Sequence durationInFrames={5 * FPS}>
        <Outro />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
