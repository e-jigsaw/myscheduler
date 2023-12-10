export type TextPack = {
  "#text": string;
};

export type Program = {
  id: string;
  ft: string;
  to: string;
  title: TextPack;
  url: TextPack;
  pfm: TextPack;
  info: TextPack;
};

type ProgramPack = {
  date: TextPack;
  prog: Program[];
};

export type Station = {
  id: string;
  name: TextPack;
  progs: ProgramPack;
};

type StationPack = {
  station: Station[];
};

type Radiko = {
  stations: StationPack;
};

export type RadikoPack = {
  radiko: Radiko;
};
