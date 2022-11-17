// vite.config.js
import { defineConfig } from "file:///D:/code/%E5%85%89%E5%A4%A7/%E5%85%89%E5%A4%A7OA%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/Gloria-Admin/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/code/%E5%85%89%E5%A4%A7/%E5%85%89%E5%A4%A7OA%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/Gloria-Admin/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import viteCompression from "file:///D:/code/%E5%85%89%E5%A4%A7/%E5%85%89%E5%A4%A7OA%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/Gloria-Admin/node_modules/vite-plugin-compression/dist/index.mjs";
import AutoImport from "file:///D:/code/%E5%85%89%E5%A4%A7/%E5%85%89%E5%A4%A7OA%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/Gloria-Admin/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/code/%E5%85%89%E5%A4%A7/%E5%85%89%E5%A4%A7OA%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/Gloria-Admin/node_modules/unplugin-vue-components/dist/vite.mjs";
import { NaiveUiResolver } from "file:///D:/code/%E5%85%89%E5%A4%A7/%E5%85%89%E5%A4%A7OA%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/Gloria-Admin/node_modules/unplugin-vue-components/dist/resolvers.mjs";
var vite_config_default = defineConfig({
  base: "./",
  plugins: [
    vue(),
    viteCompression(),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        {
          "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"]
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXFx1NTE0OVx1NTkyN1xcXFxcdTUxNDlcdTU5MjdPQVx1N0JBMVx1NzQwNlx1N0NGQlx1N0VERlxcXFxHbG9yaWEtQWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcXHU1MTQ5XHU1OTI3XFxcXFx1NTE0OVx1NTkyN09BXHU3QkExXHU3NDA2XHU3Q0ZCXHU3RURGXFxcXEdsb3JpYS1BZG1pblxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kZS8lRTUlODUlODklRTUlQTQlQTcvJUU1JTg1JTg5JUU1JUE0JUE3T0ElRTclQUUlQTElRTclOTAlODYlRTclQjMlQkIlRTclQkIlOUYvR2xvcmlhLUFkbWluL3ZpdGUuY29uZmlnLmpzXCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJ1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xyXG5pbXBvcnQgeyBOYWl2ZVVpUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJhc2U6ICcuLycsXHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgICB2aXRlQ29tcHJlc3Npb24oKSxcclxuICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgJ3Z1ZScsICd2dWUtcm91dGVyJyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAnbmFpdmUtdWknOiBbJ3VzZURpYWxvZycsICd1c2VNZXNzYWdlJywgJ3VzZU5vdGlmaWNhdGlvbicsICd1c2VMb2FkaW5nQmFyJ10sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0pLFxyXG4gICAgQ29tcG9uZW50cyh7XHJcbiAgICAgIHJlc29sdmVyczogW05haXZlVWlSZXNvbHZlcigpXVxyXG4gICAgfSlcclxuICBdXHJcbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLHFCQUFxQjtBQUM1QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLHVCQUF1QjtBQUdoQyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixnQkFBZ0I7QUFBQSxJQUNoQixXQUFXO0FBQUEsTUFDVCxTQUFTO0FBQUEsUUFDUDtBQUFBLFFBQU87QUFBQSxRQUNQO0FBQUEsVUFDRSxZQUFZLENBQUMsYUFBYSxjQUFjLG1CQUFtQixlQUFlO0FBQUEsUUFDNUU7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsZ0JBQWdCLENBQUM7QUFBQSxJQUMvQixDQUFDO0FBQUEsRUFDSDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
