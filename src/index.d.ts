import type { Microkernel } from './app/microkernel/classes/Microkernel.class'

declare global {
  // Расширяем интерфейс Window
  interface Window {
    microkernel?: Microkernel
    microfrontend?: {
      render: (container: HTMLElement) => void
    }
  }
}
