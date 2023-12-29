import { defineStore } from 'pinia'

interface Toast {
  type: 'success' | 'info' | 'warning' | 'error' 
  title: string
  delay?: number
  description?: string 
}

const useToastStore = defineStore('toast', {
  state: () => ({items: [] as Toast[]}),
  actions: {
    add(toast: Toast) {
      this.items.push(toast)
      this.removeWithDelay(toast, toast.delay || 3000)
      return toast
    },
    remove(toast: Toast) {
      const index = this.items.indexOf(toast)
      this.items.splice(index, 1)
    },
    removeWithDelay(toast: Toast, delay: number) {
      setTimeout(() => this.remove(toast), delay)
    }
  }
})

export default useToastStore