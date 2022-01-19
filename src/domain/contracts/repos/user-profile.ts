
export interface SaveUserPicture {
  savePicture: (params: SaveUserPicture.Input) => Promise<SaveUserPicture.Output>
}

export namespace SaveUserPicture {
  export type Input = { pictureUrl?: string }

  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  export type Output = void
}
