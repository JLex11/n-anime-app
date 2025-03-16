'use client'

import { useEffect } from 'react'
import { scan } from 'react-scan'

export default function ReactScan() {
	useEffect(() => {
		scan({ enabled: false })
	}, [])

	return <></>
}
