import React from 'react';

type MyProps = {
    // using `interface` is also ok
    waitBeforeShow: number;
  };

  type MyState = {
    hidden: boolean; // like this
  };

class Delayed extends React.Component<MyProps, MyState> {
    _isMounted = false;
    constructor(props : any) {
        super(props);
        this.state = {hidden : true};
    }

    componentDidMount() {
        this._isMounted = true;
        setTimeout(() => {
            this.setState({hidden: false});
        }, this.props.waitBeforeShow);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return this.state.hidden ? '' : this.props.children;
    }
}


export default Delayed;