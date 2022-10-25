import { h } from "vue"

export const renderPrefix = function (type) {
  // 部门
  if (type === 'sector') {
    return () => h('div', {
      class: 'bg-primary w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center -ml-1'
    }, [
      h('svg', {
        xmlns: '#http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 1024 1024',
        strokeWidth: 'stroke-width',
        stroke: 'currentColor',
        class: 'w-4 h-4'
      }, [
        h('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          d: 'M961.5 700.5H889V512c0-24-19.5-43.5-43.5-43.5H541v-145h72.5c24 0 43.5-19.5 43.5-43.5V77c0-24-19.5-43.5-43.5-43.5h-203C386.5 33.5 367 53 367 77v203c0 24 19.5 43.5 43.5 43.5H483v145H178.5c-24 0-43.5 19.5-43.5 43.5v188.5H62.5C38.5 700.5 19 720 19 744v203c0 24 19.5 43.5 43.5 43.5h203c24 0 43.5-19.5 43.5-43.5V744c0-24-19.5-43.5-43.5-43.5H193v-174h290v174h-72.5c-24 0-43.5 19.5-43.5 43.5v203c0 24 19.5 43.5 43.5 43.5h203c24 0 43.5-19.5 43.5-43.5V744c0-24-19.5-43.5-43.5-43.5H541v-174h290v174h-72.5c-24 0-43.5 19.5-43.5 43.5v203c0 24 19.5 43.5 43.5 43.5h203c24 0 43.5-19.5 43.5-43.5V744c0-24-19.5-43.5-43.5-43.5zM425 91.5h174v174H425v-174zm-174 667v174H77v-174h174zm348 174H425v-174h174v174zm348 0H773v-174h174v174z',
          fill: '#fff'
        })
      ])
    ])
  }
  // 子部门
  if (type === 'sector_sub') {
    return () => h('svg', {
      xmlns: '#http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 1024 1024',
      strokeWidth: 'stroke-width',
      stroke: 'currentColor',
      class: 'w-4 h-4'
    }, [
      h('path', {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        d: 'M961.5 700.5H889V512c0-24-19.5-43.5-43.5-43.5H541v-145h72.5c24 0 43.5-19.5 43.5-43.5V77c0-24-19.5-43.5-43.5-43.5h-203C386.5 33.5 367 53 367 77v203c0 24 19.5 43.5 43.5 43.5H483v145H178.5c-24 0-43.5 19.5-43.5 43.5v188.5H62.5C38.5 700.5 19 720 19 744v203c0 24 19.5 43.5 43.5 43.5h203c24 0 43.5-19.5 43.5-43.5V744c0-24-19.5-43.5-43.5-43.5H193v-174h290v174h-72.5c-24 0-43.5 19.5-43.5 43.5v203c0 24 19.5 43.5 43.5 43.5h203c24 0 43.5-19.5 43.5-43.5V744c0-24-19.5-43.5-43.5-43.5H541v-174h290v174h-72.5c-24 0-43.5 19.5-43.5 43.5v203c0 24 19.5 43.5 43.5 43.5h203c24 0 43.5-19.5 43.5-43.5V744c0-24-19.5-43.5-43.5-43.5zM425 91.5h174v174H425v-174zm-174 667v174H77v-174h174zm348 174H425v-174h174v174zm348 0H773v-174h174v174z',
        fill: '#FF432A'
      })
    ])
  }
  // 职位
  if(type === 'post') {
    return () => h('div', {
      class: 'bg-primary w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center -ml-1'
    }, [
      h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        strokeWidth: '1.5',
        stroke: 'currentColor',
        class: 'w-5 h-5 text-white'
      }, [
        h('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          d: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
        })
      ])
    ])
  }
}