import React from 'react';
import './App.css';
import { AppRoutes } from './component/appRouts/routs';
import { routes } from './component/appRouts/routs.config';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


class App extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

	}

	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Switch>
						<AppRoutes routes={routes} />
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
