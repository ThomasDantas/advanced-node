
export interface SaveUserPicture {
  savePicture: (params: SaveUserPicture.Input) => Promise<SaveUserPicture.Output>
}

export namespace SaveUserPicture {
  export type Input = { pictureUrl?: string, initials?: string }

  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  export type Output = void
}

export interface LoadUserProfile {
  load: (params: LoadUserProfile.Input) => Promise<LoadUserProfile.Output>
}

export namespace LoadUserProfile {
  export type Input = { id: string }
  export type Output = { name?: string }
}
