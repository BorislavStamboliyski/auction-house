import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import * as auctionService from '../../services/auctionService'
import { useUserContext } from "../../contexts/userContext";
import { Bid } from "../Auctions/AuctionItems/Bids/Bid";
import * as bidService from '../../services/bidService'

// To fix categories to have better name!!
export const AuctionDetails = () => {

    const { userId, isAuthenticated } = useUserContext();
    const { auctionId } = useParams();
    const [auction, setAuction] = useState({});
    const [bids, setBids] = useState([]);
    const [bidForm, setBidform] = useState(false)

    useEffect(() => {
        Promise.all([
            auctionService.getAuction(auctionId),
            bidService.getBids(auctionId)
        ]).then(result => {
            setAuction(result[0])
            setBids(result[1])
        })

    }, [auctionId])


    const higherBidder = bids.length !== 0 ? bids.reduce((prev, curr) => prev.bid > curr.bid ? prev : curr) : {};


    const isOwner = userId === auction._ownerId;

    const onBidClick = () => {

        setBidform(true);

    }

    return (
        <>{bidForm && (<Bid auctionId={auctionId} />)}
            <section className="details_section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 px-0">
                            <div className="img-box">
                                <img src={auction.imageUrl} alt="" />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="detail-box">
                                <div className="heading_container">
                                    <hr />
                                    <h2>
                                        {auction.name}
                                    </h2>
                                    <h4>Category:  {auction.category}</h4>
                                    <h4>Starting Price: {auction.price}$</h4>
                                </div>
                                <article>
                                    <p>
                                        {auction.summary}
                                    </p>
                                    {bids.length !== 0 ?
                                        <div>Current highest bid: {`${higherBidder.bid}`}$ by {`${higherBidder.bidder.username}`}</div>
                                        : <div>No current bids</div>
                                    }
                                </article>
                                {isOwner &&
                                    (<Link to={`/auctions/edit/${auction._id}`}> Edit </Link>)}
                                {/* Delete can be changed to buton!!! stay as link!!! can make a disabled edit form!!! */}
                                {isOwner &&
                                    (<Link to={`/auctions/close/${auction._id}`}> Close Auction </Link>)}
                                {isAuthenticated && !isOwner &&
                                    (<Link to={`/auctions/${auctionId}`} onClick={onBidClick}> Bid </Link>)}
                                <Link to="/auctions"> Back </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}