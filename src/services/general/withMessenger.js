import * as React from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';

export function withMessenger(Component) {
    return function MessengerComponent(props) {
        return (
            <>
                {contexts => <Component {...props} {...contexts} />}
                <MessengerCustomerChat
                    pageId="129705330373192"
                    appId="1301955370137940"
                    themeColor="white"
                />
            </>
        );
    };
}
