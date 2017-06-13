import React, {PropTypes, Component} from 'react';

import { IconButton, AppBar } from 'material-ui';

const defaultStyle = {
    marginLeft: 20
};

class Header extends Component {
    render() {
        return (
            <header className="header">
                <AppBar title="Doodle"
                        showMenuIconButton={false}
                        iconElementRight={<IconButton iconClassName="muidocs-icon-custom-github" />}

                />
            </header>
        );
    }
}

export default Header;
