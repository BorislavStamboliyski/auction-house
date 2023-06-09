import { createContext, useContext, useEffect, useState } from "react";

import * as auctionService from '../services/auctionService'
import { useUserContext } from "./userContext";
import { useNavigate } from "react-router-dom";


export const AuctionContext = createContext();

export const AuctionProvider = ({
    children,
}) => {

    const [auctions, setAuctions] = useState([]);
    

    const { errorHandler, token, onLoading } = useUserContext();

    const navigate = useNavigate();

    useEffect(() => {
        auctionService.getAll()
            .then(result => {
                setAuctions(result)
            });
    }, []);

    const onCreateAuctionSubmit = async (data) => {
        if (data.name !== '' && data.category !== '' && data.price !== '' && data.imageUrl !== '' && data.summary !== '') {

            try {
                onLoading();
                const newAuction = await auctionService.createAuction(data, token);
                setAuctions(state => [...state, newAuction])
                onLoading();
                navigate('/auctions');
            } catch (err) {
                onLoading();
                errorHandler(err)
            }

        } else {
            errorHandler();
        }

    }

    const onEditAuctionSubmit = async (data) => {

        if (data.name !== '' && data.category !== '' && data.price !== '' && data.imageUrl !== '' && data.summary !== '') {

            try {
                onLoading();
                const result = await auctionService.editAuction(data, data._id, token);
                setAuctions(state => state.map(x => x._id === data._id ? result : x));
                onLoading();
                navigate(`/auctions/${data._id}`);
            } catch (err) {
                onLoading();
                errorHandler(err);
            }

        } else {
            errorHandler();
        }
    }

    const onDeleteAuctionSubmit = async (data) => {

        try {
            onLoading();
            await auctionService.closeAuction(data._id, token);
            setAuctions(state => state.filter(auction => auction._id !== data._id));
            onLoading();
            navigate(`/auctions`);
        } catch (err) {
            onLoading();
            errorHandler(err);
        }
        
    }



    const contextValues = {
        auctions,
        onCreateAuctionSubmit,
        onEditAuctionSubmit,
        onDeleteAuctionSubmit,
    }


    return <AuctionContext.Provider value={contextValues}>
        {children}
    </AuctionContext.Provider>
}

export const useAuctionContext = () => {
    const context = useContext(AuctionContext);

    return context;
}