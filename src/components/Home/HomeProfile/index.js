import React, { Fragment, useState, useEffect } from 'react';
import ProfileBio from './ProfileBio/index';
import ProfileOutline from './ProfileOutline';
import { deriveDateDetails } from '../../Common/utils/DateSplitter';

const HomeProfile = ({
  imageURL,
  userName,
  createdAt,
  description,
  location,
  saveBioInfo,
  uploadFile
}) => {
  const [displayprofileBioModal, setDisplayProfileBioModal] = useState(false);

  const saveBio = async data => {
    await saveBioInfo(data);
    setDisplayProfileBioModal(false);
  };
  const onChangeDisplayProfile = () => {
    setDisplayProfileBioModal(!displayprofileBioModal);
  };
  return (
    <Fragment>
      <ProfileOutline>
        <div>
          <img src={imageURL}></img>
          <input type="file" id="fileUpload" onChange={e => uploadFile(e)} />
          <label htmlFor="fileUpload">
            <i class="fa fa-pencil"></i>
          </label>
        </div>
        <p>{userName}</p>
        <label>
          <i className="fa fa-calendar"></i>joined{' '}
          {deriveDateDetails(createdAt, 'DATE')}
          <sup>{deriveDateDetails(createdAt, 'COMPLETOR')}</sup>&nbsp;
          {deriveDateDetails(createdAt, 'MONTH')}{' '}
          {deriveDateDetails(createdAt, 'YEAR')}
        </label>
        {description.length ? (
          <dl>
            <strong style={{ color: 'deepskyblue' }}>Bio:</strong> {description}{' '}
            <br />
          </dl>
        ) : null}

        {location.length ? (
          <dl>
            <strong style={{ color: 'deepskyblue' }}>Location:</strong>{' '}
            {location}
          </dl>
        ) : null}
        <span
          onClick={() => {
            onChangeDisplayProfile();
          }}
        >
          <i class="fa fa-pencil"></i>
        </span>
      </ProfileOutline>
      {displayprofileBioModal ? (
        <ProfileBio
          onChangeDisplayProfile={onChangeDisplayProfile}
          saveBioInfo={saveBio}
          description={description}
          location={location}
        />
      ) : null}
    </Fragment>
  );
};

export default HomeProfile;
