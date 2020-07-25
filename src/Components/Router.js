import React, { useEffect, useState } from 'react';
import Reader from './Reader'
import Writer from './Writer'

const pages = {
    reader: "reader",
    writer: "writer"
}

const Router = () => {
    const [page, setPage] = useState(pages.reader)

    switch (page) {
        case pages.reader: { return <Reader setPage={setPage} /> }
        case pages.writer: { return <Writer setPage={setPage} /> }
    }

}

export default Router