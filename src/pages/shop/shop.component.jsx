import React from 'react'
import { Route } from 'react-router-dom'

import CollectionsOverview from '../../components/collections-overview/collections-overview.components'
import CollectionPage from '../../pages/collection/collection.component'

import { firestore } from '../../firebase/firebase.utils'

class ShopPage extends React.Component {

	unsubscribeFromSnapshot = null

	componentDidMount() {
		const collectionRef = firestore.collection('collections')

		collectionRef.onSnapshot(async snapshot => {
			console.log(snapshot)
		})
	}

	render() {
		const {match} = this.props
		return (
			<div className='shop-page'>
				<Route exact path={`${match.path}`} component={CollectionsOverview}></Route>
				<Route path={`${match.path}/:collectionId`} component={CollectionPage}></Route>
			</div>
		)
	}
}
	
export default ShopPage