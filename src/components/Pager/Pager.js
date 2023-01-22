import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

export default function Pager(props) {

    let [selectedPage, setSelectedPage] = useState(parseInt(props.currentPage));
    let totalPages = Math.ceil(props.resultCount / props.resultsPerPage);

    useEffect(_=>{
        props.setCurrentPage(selectedPage);
    }, [selectedPage, props]);

    useEffect(()=>{
        var paginationItem = document.getElementsByClassName("pagination-item");
        for(let i=0; i<paginationItem.length; i++){
            if(!paginationItem[i].classList.contains("disabled")){
                paginationItem[i].setAttribute("tabIndex", 0);
            }
        }
    })

    function goToNextPage() {
        setSelectedPage(selectedPage + 1);
        scrollTop();
    }

    function goToPreviousPage() {
        setSelectedPage(selectedPage - 1);
        scrollTop();
    }

    function scrollTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    var i = 0;
    var page_links = [];

    var minPage = 1;
    var maxPage = totalPages;

    if (selectedPage - minPage > 2) {
        minPage = selectedPage - 2;
    }

    if (maxPage - selectedPage > 2) {
        maxPage = parseInt(selectedPage) + 2;
    }

    for (i = minPage; i <= maxPage; i++) {
        if (i === parseInt(selectedPage)) {
            page_links.push(
                <li className="pagination-item page-number-li active" key={i} onClick={scrollTop}>
                    <span className="page-number">
                        {i}
                    </span>
                </li>
            );
        } else {
            page_links.push(
                <li className={'pagination-item page-number-li previous msc-page-item'} key={i} onClick={scrollTop}>
                    <span className="page-number" id={i} onClick={(e) => setSelectedPage(parseInt(e.currentTarget.id))}>{i}</span>
                </li>
            );
        }
    }

    var previousButton;
    if (parseInt(selectedPage) === 1) {
        previousButton = (<li className="pagination-item previous msc-page-item disabled" key="prev">
                            <div className="arrow left"><i area-hidden="true" className="fa fa-chevron-left"></i></div>Previous
                        </li>);
    } else {
        previousButton = (<li className="pagination-item previous msc-page-item" key="prev" onClick={goToPreviousPage}>
                            <div className="arrow left"><i area-hidden="true" className="fa fa-chevron-left"></i></div>Previous
                        </li>);
    }

    var nextButton;
    if (parseInt(selectedPage) === totalPages) {
        nextButton = (<li className="pagination-item next msc-page-item disabled" key="next">
                            Next<div className="arrow right"><i area-hidden="true" className="fa fa-chevron-right"></i></div>
                        </li>);
    } else {
        nextButton = (<li className="pagination-item next msc-page-item" key="next" onClick={goToNextPage}>
                            Next<div className="arrow right"><i area-hidden="true" className="fa fa-chevron-right"></i></div>
                    </li>);
    }
    return (
        props.resultCount > props.resultsPerPage && <nav aria-label="..."  className="pager">
           <ul  className={classnames('pagination-container', { [props.className]: props.className })}>
                {previousButton}
                {page_links}
                {nextButton}
            </ul>
        </nav>
    );

    }
