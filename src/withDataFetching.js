import React from 'react';

export default function withDataFetching(WrappedComponent) {
    class WithDataFetching extends React.Component {
        constructor() {
            super();
            this.state = {
                data: [],
                loading: true,
                error: ''
            };
        }

        async componentDidMount() {
            try {
                const tickets = await fetch('../../assets/data.json');
                const ticketsJSON = await tickets.json();

                if (ticketsJSON) {
                    this.setState({
                        data: ticketsJSON,
                        loading: false
                    })
                }

            } catch (error) {
                this.setState({
                    data: error.message,
                    loading: false
                })
            }
        }

        render() {
            const { data, loading, error } = this.state;

            return (
                <WrappedComponent
                    data={data}
                    loading={loading}
                    error={error}
                    {...this.props}
                />
            );
        }
    }

    WithDataFetching.displayName =
        `WithDataFetching(${WrappedComponent.name})`;

    return WithDataFetching;
}