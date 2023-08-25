import React from 'react'
import ReactDOM from 'react-dom'
import Host from './host';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Host />,
    document.body.appendChild(document.createElement('div')),
  )
})