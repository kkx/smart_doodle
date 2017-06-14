import React, {PropTypes, Component} from 'react';

import { IconButton, AppBar } from 'material-ui';

const defaultStyle = {
    marginLeft: 20
};

class Header extends Component {
    handleGithubIconClick = () => {
        window.location = 'https://github.com/kkx/smart_doodle';
    }

    render() {
        return (
            <header className="header">
                <AppBar title="Doodle(on Ropsten)"
                        showMenuIconButton={false}
                        iconElementRight={<IconButton iconClassName="muidocs-icon-custom-github" onClick={this.handleGithubIconClick}/>}

                />
            </header>
        );
    }
}

export default Header;
