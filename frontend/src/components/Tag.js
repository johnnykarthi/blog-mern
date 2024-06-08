import React from 'react'

export default function Tag({tag,setActive}) {
  return (
    <span className="tag" onClick={setActive}>{tag}</span>
  )
}
