import React from "react";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Audio } from "@remotion/media";
import { Sequence, staticFile, interpolate } from "remotion";
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

const AUDIO_FILES = [
  "intro",
  "section1",
  "section2",
  "section3",
  "section4",
  "section5",
  "outro",
];

const OUTRO_DURATION = 5 * FPS;

function getSectionStart(index: number): number {
  if (index === 0) return 0;
  // After intro, each section starts after previous minus transition overlap
  let start = INTRO_DURATION - TRANSITION_DURATION;
  for (let i = 1; i < index; i++) {
    start += SECTION_DURATION - TRANSITION_DURATION;
  }
  // Outro
  if (index === AUDIO_FILES.length - 1) {
    start += SECTION_DURATION - TRANSITION_DURATION;
  }
  return start;
}

export const VibeCodingVideo: React.FC = () => {
  return (
    <>
      {/* Audio tracks — layered as absolute sequences */}
      {AUDIO_FILES.map((name, i) => {
        const start = getSectionStart(i);
        const duration =
          i === 0
            ? INTRO_DURATION
            : i === AUDIO_FILES.length - 1
              ? OUTRO_DURATION
              : SECTION_DURATION;

        return (
          <Sequence
            key={`audio-${name}`}
            from={start}
            durationInFrames={duration}
          >
            <Audio
              src={staticFile(`audio/${name}.mp3`)}
              volume={(f) =>
                interpolate(
                  f,
                  [0, 10, duration - 15, duration],
                  [0, 1, 1, 0],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }
                )
              }
            />
          </Sequence>
        );
      })}

      {/* Visual tracks with transitions */}
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
        <TransitionSeries.Sequence durationInFrames={OUTRO_DURATION}>
          <Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};
