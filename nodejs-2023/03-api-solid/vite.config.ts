import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [
      ['src/http/controllers/**', 'prisma'], // segunda posição precisa ser exatamente o nome que vem após o nome da pasta "vitest-environment-"
    ],
  },
})
