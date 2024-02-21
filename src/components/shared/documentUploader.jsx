import React, { useRef, useState } from 'react';
import '../../assests/scss/drop-file-input.css';
import uploadImg from '../../assests/image/Upload-icon.svg';
import bin from '../../assests/image/Bin-icon.svg';


function DropFileInput(props) {

    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);
    const [editableNames, setEditableNames] = useState({});

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        console.log("new file", newFile);
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            const newEditableNames = { ...editableNames };
            newEditableNames[newFile.name] = newFile.name;
            setEditableNames(newEditableNames);
            props.onFileChange(updatedList);
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        const newEditableNames = { ...editableNames };
        delete newEditableNames[file.name];
        setEditableNames(newEditableNames);
        props.onFileChange(updatedList);
    }

    const handleNameChange = (e, file) => {
        console.log("handleNameChange", e.target.value)
        const newEditableNames = { ...editableNames };
        newEditableNames[file.name] = e.target.value;
        setEditableNames(newEditableNames);
        const updatedList = fileList.map((item) => (item === file ? { ...item, name: e.target.value } : item));
        props.onFileChange(updatedList);
    };

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
                    <img src={uploadImg} alt="icon" className='uploadimage' />
                    <p className='drag-drop-file'>Drag & drop files or <span>Browse</span></p>
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
                                    <div className="drop-file-preview__item__info w-100">
                                        <input
                                            type="text"
                                            value={editableNames[item.name]}
                                            onChange={(e) => handleNameChange(e, item)}
                                        />
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>
                                        <img src={bin} alt="" />
                                    </span>
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
