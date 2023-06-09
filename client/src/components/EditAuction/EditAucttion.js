import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import * as auctionService from '../../services/auctionService'
import { useUserContext } from "../../contexts/userContext";
import { useAuctionContext } from "../../contexts/auctionContext";

import { Error } from "../Error/Error";
import { Header } from "../Header/Header";
import { Loader } from "../Loader/Loader";


export const EditAuction = () => {

    const { onEditAuctionSubmit } = useAuctionContext();
    const {serverError, error, loader } = useUserContext();
    const { auctionId } = useParams();
    const { formValues, onChangeHandler, onSubmit, changeFormValues } = useForm({
        _id: '',
        name: '',
        category: '',
        price: '',
        imageUrl: '',
        summary: '',
    }, onEditAuctionSubmit);


    useEffect(() => {
        auctionService.getAuction(auctionId)
            .then(result => {
                changeFormValues(result);
            }
            )
    }, [auctionId])

    return (
        <><Header />
            <section className="vh-100 bg-image_editCreate">
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">

                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card" style={{ borderRadius: "15px" }}>
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase text-center mb-5">Edit Your Auction</h2>
                                        {loader && <Loader />}
                                        {(error || serverError) && <Error />}
                                        <form onSubmit={onSubmit}>

                                            <div className="form-outline mb-4">
                                                <input type="text" id="form3Example1cg" name="name" className="form-control form-control-lg" value={formValues.name} onChange={onChangeHandler} />
                                                <label className="form-label" htmlFor="form3Example1cg" >Name</label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example3cg">Category:</label>
                                                <select id="form3Example3cg" name="category" className="form-control form-control-lg" value={formValues.category} onChange={onChangeHandler} >
                                                    <option value="Real Estate">Real Estate</option>
                                                    <option value="Vehicles">Vehicles</option>
                                                    <option value="Electronics">Electronics</option>
                                                    <option value="Tools and Machinery">Tools and Machinery</option>
                                                    <option value="Jewelry">Jewelry</option>
                                                    <option value="Sporting goods and Equipment">Sporting goods and Equipment</option>
                                                    <option value="Furniture">Furniture</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="text" id="form3Example4cg" name="price" className="form-control form-control-lg" value={formValues.price} onChange={onChangeHandler} />
                                                <label className="form-label" htmlFor="form3Example4cg">Starting Price:</label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="text" id="form3Example4cdg" name="imageUrl" className="form-control form-control-lg" value={formValues.imageUrl} onChange={onChangeHandler} />
                                                <label className="form-label" htmlFor="form3Example4cdg">ImageUrl:</label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="text" id="form3Example4cdg" name="summary" className="form-control form-control-lg" value={formValues.summary} onChange={onChangeHandler} />
                                                <label className="form-label" htmlFor="form3Example4cdg">Summary:</label>
                                            </div>


                                            <div className="button_form-container">
                                                <button type="submit"
                                                    className="btn btn-success btn-block btn-lg gradient-custom-4">Publish</button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}