import React from "react";
import PropTypes from "prop-types";
import classes from './EzYoutubeEmbed.module.css';

const YoutubeEmbed = ({ embedId }: any) => (
    <div className={classes.videoResponsive}>
        <iframe
            className={classes.iFrame}
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${embedId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
    </div>
);

YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;