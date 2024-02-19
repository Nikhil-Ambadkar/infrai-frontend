import React, { useRef, useState } from 'react';
import './drop-file-input.css';
import uploadImg from '../assests/image/Upload-icon.svg';
import bin from '../assests/image/Bin-icon.svg';


function DropFileInput(props) {

    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        console.log("new file", newFile);
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p>Drag & drop files or Browse</p>
                    <p className="drop-file-input__label_msg">Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</p>
                </div>
                <input type="file" value="" onChange={onFileDrop} />
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Uploaded
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    {/* <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" /> */}
                                    <div className="drop-file-preview__item__info w-100">
                                        <p className='mt-2 px-3'>{item.name}</p>
                                        {/* <p>{item.size}B</p> */}
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>  <img src={bin} alt="" /></span>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </>
    );
}

export default DropFileInput;
