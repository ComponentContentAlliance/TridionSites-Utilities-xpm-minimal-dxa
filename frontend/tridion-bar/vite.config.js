import { defineConfig } from 'vite'

export default defineConfig({
    server:{
        port:3000
    },
    
    build: {
        lib: {
            entry: './src/TridionBar.ts',
            name: 'tridion-bar',
            formats: ['es'],
            fileName: (format) => `tridion-bar.${format}.js`,
            
        },
        outDir:"../../xpm-minimal-deployables/frontend/Content/TridionBar",
        emptyOutDir:true,
        minify:true,
        cssMinify:true,
        rollupOptions: {
            
            output: {              
                entryFileNames: `js/tridion-bar.js`,
                chunkFileNames: `js/[name]-chunk.js`,
                assetFileNames: (assetInfo) => {
                    const ext = assetInfo.name?.split('.').pop();
                    if (assetInfo.name?.endsWith('.css')) {
                        return 'css/[name].css';
                    }
                    return 'assets/[name].[ext]';
                }
            }
        },
    },
})