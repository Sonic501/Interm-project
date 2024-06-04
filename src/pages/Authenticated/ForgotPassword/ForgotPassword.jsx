import React from 'react'
import LayoutAuthen from '../LayoutAuthen/LayoutAuthen'

const ForgotPassword = () => {
    return (
        <LayoutAuthen>
            <div className="flex items-center justify-end h-screen mr-[56px]">
                <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 w-[614px]">
                    <div>
                        <h1 className="mb-6 text-center text-[36px] leading-10 font-[700] tracking-[0.2rem]">Forgot password</h1>

                    </div>
                    <div>
                        <div className="mb-[10px] mx-20 mt-[70px]">

                            <input
                                className="appearance-none bg-[#F1F1F1] rounded-[10px] w-full py-2 px-5 text-gray-700 leading-tight h-[57px] placeholder:text-[black]"
                                id="username"
                                type="text"
                                placeholder='Enter email'

                            />
                        </div>


                    </div>


                    <div className="flex items-center justify-center mx-20">
                        <button
                            className="appearance-none bg-[#2D3748] rounded-[10px] w-full py-2 px-3 text-white leading-tight font-[700] h-[57px] text-[16px]"
                            type="submit"
                        // onClick={handleSubmit}
                        >
                            Send new password
                        </button>
                    </div>
                </form>
            </div>
        </LayoutAuthen>
    )
}

export default ForgotPassword