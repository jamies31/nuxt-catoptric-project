import { defineStore } from 'pinia'

export interface IMirrorManager {
  allMirrors: IMirror[]
}

export interface IMirror {
  number: string,
  isSelected: boolean,
}

export const useMirrorManager = defineStore('mirrorManager',{
  state: (): IMirrorManager => ({
    allMirrors: []
  }),
  actions: {
    addMirrors(mirrors: IMirror[]) {
      if (this.allMirrors.length > 0) {
        this.allMirrors = []
      }
      this.allMirrors = mirrors
    },
    removeMirror(mirror: IMirror) {
      this.allMirrors = this.allMirrors.map(mirror_ => {
        if (mirror_.number === mirror.number) {
          mirror_.isSelected = false
        }
        return mirror_
      })
    },
    removeMirrors() {
      this.allMirrors = this.allMirrors.map(mirror => {
        mirror.isSelected = false
        return mirror
      })
    },
    selectAllMirrors() {
      this.allMirrors = this.allMirrors.map(mirror => {
        mirror.isSelected = true
        return mirror
      })
    },
    selectMirrors(mirrors: IMirror[]) {
      const selectedNumbers = mirrors.map(mirror => mirror.number)
      this.allMirrors = this.allMirrors.map(mirror => {
        if (selectedNumbers.includes(mirror.number)) {
          mirror.isSelected = true
        }
        return mirror
      })
    }
  },
  getters: {
    getAllMirrors(): IMirror[] {
      return this.allMirrors
    },
    selectedMirrors(): IMirror[] {
      return this.allMirrors.filter(mirror => mirror.isSelected)
    },
    mirrorCount(): number {
      return this.allMirrors.length
    },
  }
})