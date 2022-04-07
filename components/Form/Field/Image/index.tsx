import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Avatar, Box, IconButton, SxProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { FC, useCallback, useMemo } from 'react';
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading';
import { MobXForm } from '~/lib/form';

const sx100: SxProps = { width: '100%', height: '100%' };

export const FormFieldImage: FC<{ formField: MobXForm.InputProps<ImageType | undefined> }> = observer(
    ({ formField }) => {
        const value = useMemo(() => (formField.value ? [formField.value] : []), [formField.value]);
        const handleChange = useCallback((list: ImageListType) => formField.onChange(list[0]), [formField]);
        const src = formField.value?.dataURL;

        return (
            <ImageUploading value={value} onChange={handleChange}>
                {({ onImageUpload, onImageRemove }) => (
                    <Box sx={{ position: 'relative', ...sx100 }}>
                        <Avatar variant="rounded" sx={sx100} src={src}>
                            <IconButton onClick={onImageUpload}>
                                <AddPhotoAlternateIcon sx={{ width: 50, height: 50 }} color="inherit" />
                            </IconButton>
                        </Avatar>
                        {src && (
                            <IconButton
                                onClick={() => onImageRemove(0)}
                                sx={{ position: 'absolute', top: 2, right: 2 }}
                            >
                                <HighlightOffIcon
                                    sx={{ width: 24, height: 24 }}
                                    color="inherit"
                                    enableBackground="red"
                                />
                            </IconButton>
                        )}
                    </Box>
                )}
            </ImageUploading>
        );
    },
);
