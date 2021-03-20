'use strict';
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function pingDB() {
    const { data, error } = useSWR(`/api/ping`, fetcher)
  
    return {
      pong: data,
      isLoading: !error && !data,
      isError: error
    }
}

function DBTag(props) {
    var got = pingDB();
    if (got.isLoading) {
        return <h1>Loading</h1>
    }
    else if (got.isError) {
        return <h1>Error</h1>
    }
    else {
        return <h1>Yay</h1>
    }
}

export default function dbtest(props) {
    return (
        <>
        <h1>Eat Me Raw</h1>
        <DBTag/>
        </>
    )
}
