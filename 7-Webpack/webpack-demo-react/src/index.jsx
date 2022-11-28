import "core-js/stable"
import "regenerator-runtime/runtime"
import React from 'react'
import ReactDOM from 'react-dom'
import '@/index.less'
import style from './index.module.less'

console.log("测试 cheap-module-eval-source-map")
console.log("VERSION_H5", VERSION_H5)
console.log("process.env.NODE_ENV",process.env.NODE_ENV)
console.log("process.env.MY_TYPE", process.env.MY_TYPE)


function App() {
  return (
    <div>
      <div className="test">1111222测试更改1112122</div>
      <div className={style.name}>Train</div>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)