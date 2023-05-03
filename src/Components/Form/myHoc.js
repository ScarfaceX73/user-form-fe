import React from 'react'

const myHOC = (WrappedComponent) => {
    const EnhancedComponent = (props) => {
        return (
            <div>
                <WrappedComponent {...props} />
            </div>
        )
    }
    return EnhancedComponent;
}

export default myHOC;