import React, { FC } from 'react';
import { ImageApi } from '../../../services/ImageService/interfaces';

interface Props {
	source: ImageApi;
}
const ImagePreview: FC<Props> = ({ source }) => {
	return (
		<div>
			<div>{source.description}</div>
			<img src={source.urls.thumb} alt={source.description}/>
		</div>
	);
};

export { ImagePreview };
