import React from 'react'
import { Modal, Pagination } from "@mui/material";
import { Card } from "@mui/material";
import styled from "styled-components";
import ViewDraftSyllabus from './ViewDraftSyllabus';
import { DeleteIcon } from './Icons';

const DraftModal = (props) => {
    const NewCard = styled(Card)`
    position: absolute;
    width: 800px;
    top: 12%;
    left: 23%;
    border-radius: 12px !important;
    overflow: auto;
    height: 500px;
  `;

    const {
        value, corlor, handleDraftOpen, isModalOpened, currentListItems, startIndex,
        setIsModalOpened, totalPages, currentPage, handlePageChange
    } = props;




    const [height, setHeight] = React.useState(400);
    return (
        <div>
            <Modal
                open={isModalOpened}
                onClose={() => {
                    setIsModalOpened(false);
                }}
            >
                <NewCard>
                    <div className="p-10 ">
                        <div className="flex gap-3 mb-4">
                            <span className="font-bold ">List Draft</span>

                        </div>

                        {currentListItems?.map((item, index) => (
                            <div className="syllabus_draft_list_body" key={item.id}>
                                <p>{startIndex + index + 1}. </p>
                                <div className="syllabus_draft_list_body_content">
                                    <p>{item.name}</p>
                                    <p>{item.id}</p>
                                    <p>{item.dateCreated}</p>
                                    <p className="syllabus_draft_list_body_content_code">{item.code}</p>
                                </div>
                                <div className="syllabus_draft_list_body_action">
                                    <a className="edit" href="">
                                        {item.creatorName}
                                    </a>

                                </div>
                            </div>
                        ))}
                        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />

                    </div>
                    {/* <ViewDraftSyllabus /> */}
                </NewCard>

            </Modal>
        </div>
    )
}

export default DraftModal
