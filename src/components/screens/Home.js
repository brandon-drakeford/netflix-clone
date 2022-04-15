import React from 'react'
import MoveRow from '../MoveRow'
import Banner from '../Banner'
import NavBar from '../NavBar'
import { movieList } from '../../movies'

export default function Home() {
  return (
      <>
        <NavBar />
        <Banner />

        {movieList().length && movieList().map((movie) => {
            return (<MoveRow  title={movie.title} fetchUrl={movie.url} />)
        })}
      </>
  )
}