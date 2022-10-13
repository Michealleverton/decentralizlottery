import React from 'react';
import { useQuery, gql } from "@apollo/client";
import "./TransactionList.css";
import loader from "../assets/loader.gif";

const GET_TRANSACTIONS = gql`
    query {
        transferReceiveds(skip: 0, first: 5, orderBy: timestamp, orderDirection: desc, where: {from: "0x3AA0Df703D0086495a3317A3e507b9C5302b42C1"}) {
            id
            from
            amount
            lottonum
            timestamp
        }

        freePlays(skip: 0, first: 5, orderBy: timestamp, orderDirection: desc, where: {receiver: "0x3AA0Df703D0086495a3317A3e507b9C5302b42C1"}) {
            id
            receiver
            lottonum
            timestamp
  }
    }
`;

export default function TransactionList() {

    const { error, data, loading } = useQuery(GET_TRANSACTIONS);

    console.log({ error, loading, data });

    if (loading) return <div className="TransactionList"><img alt="" src={loader} /></div>

    if (error) return <div>something went wrong</div>

    return (
        <div className="TransactionList pb-5">

            <div className="container text-center pb-5 pt-5">
                <h1 className="fw-bolder text-center text-white">Your Tickets</h1>
            </div>
            {data.transferReceiveds.map((transfers) => {
                return (
                    <div key={transfers.id} className="ticketholder mb-5">
                        <h6>Transaction: ‎
                            <a className="cleanlinks" target="_blank" rel="noreferrer" href={`https://goerli.etherscan.io/tx/${transfers.id.substring(0, 66)}`}>
                                {transfers.id.substring(0, 10)} ...
                            </a>
                        </h6>

                        <h6>Wallet: {transfers.from.substring(0, 6)} ... {transfers.from.substring(38)}</h6>
                        <h6>Amount: {transfers.amount}</h6>
                        <h6>Lottery Number: {transfers.lottonum}</h6>
                    </div>
                );
            })}

            <div className="container text-center pb-5 pt-5">
                <h1 className="fw-bolder text-center text-white">Free Play Tickets</h1>
            </div>
            {data.freePlays.map((freeplay) => {
                return (
                    <div key={freeplay.id} className="ticketholder mb-5">
                        <h6>Transaction: ‎
                            <a className="cleanlinks" target="_blank" rel="noreferrer" href={`https://goerli.etherscan.io/tx/${freeplay.id.substring(0, 66)}`}>
                                {freeplay.id.substring(0, 10)} ...
                            </a>
                        </h6>

                        <h6>Wallet: {freeplay.receiver.substring(0, 6)} ... {freeplay.receiver.substring(38)}</h6>
                        <h6>Lottery Number: {freeplay.lottonum}</h6>
                    </div>
                );
            })}

        </div>
    )
}