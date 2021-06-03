import React, { useEffect, useRef } from 'react'

const Paypal = (props) => {
    const paypal = useRef()
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units: [
                        {description: props.compra.concepto, amount: {value: props.compra.monto, currency_code: 'USD'}}
                    ]
                })
            },
            onApprove: (data, actions) => {
                const order = actions.order.capture()
                alert("Compra satisfactoria!!")
                console.log(order)
            },
            onError: (err) => {
                alert("Compra NO exitosa, intentá otro dia!")
                console.log(err)
            }
        }).render(paypal.current)
    }, [])
    return <div ref={paypal}></div>
}

export default Paypal
