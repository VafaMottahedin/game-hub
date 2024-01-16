import {
  Button,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
  Spinner,
} from '@chakra-ui/react';
import useGenres, { Genre } from '../hooks/useGenres';
import getCroppedImageUrl from '../services/image-url';
import { BsX } from 'react-icons/bs';

interface Props {
  onSelectGenre: (genre: Genre | null) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ onSelectGenre, selectedGenre }: Props) => {
  const { data, error, isLoading } = useGenres();

  if (error) {
    return null;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}>
        Genres
      </Heading>
      <List>
        {data.map((genre) => (
          <ListItem key={genre.id} paddingY="5px">
            <HStack>
              <Image
                boxSize="32px"
                objectFit="cover"
                borderRadius={8}
                src={getCroppedImageUrl(genre.image_background)}
              />
              <Button
                fontSize="lg"
                whiteSpace="normal"
                textAlign="left"
                fontWeight={genre.id === selectedGenre?.id ? 'bold' : 'normal'}
                variant="link"
                onClick={() => onSelectGenre(genre)}
              >
                {genre.name}
              </Button>
              {selectedGenre && selectedGenre.id === genre.id && (
                <Button size="xs" onClick={() => onSelectGenre(null)}>
                  <BsX />
                </Button>
              )}
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
