import { Box, Flex, Image, Link } from "@chakra-ui/react";
import { Character, Episode } from "../../../api/RickAndMortyAPI";

type Props = {
  resident: Character & {
    episodes?: (Episode | null)[] | undefined;
  };
  handleImageClick: (resident: Character) => void;
};
const CardUi = ({ resident, handleImageClick }: Props) => {
  return (
    <>
      <Box
        mt={5}
        p="5"
        maxW="320px"
        minH="600px"
        borderWidth="1px"
        bgColor="white"
      >
        <Image
          borderRadius="md"
          src={resident.image}
          _hover={{ cursor: "pointer" }}
          onClick={() => handleImageClick(resident)}
        />
        <Flex align="baseline" mt={2}>
          <Link href={resident.url} isExternal fontWeight="bold">
            Name: {resident.name}
          </Link>
        </Flex>
        <Flex mt={2} mb={2} align="flex-start" flexDir="column">
          <Box as="span" color="gray.600" fontSize="sm" mb={2}>
            <strong>Species:</strong> {resident.species} -
            <strong>Status:</strong> {resident.status}
          </Box>
          <Box as="span" color="gray.600" fontSize="sm" mb={2}>
            <strong>Origin:</strong> {resident.origin.name}
          </Box>
        </Flex>
        {/* Displaying the first three episodes */}
        <Box as="span" color="gray.600" fontSize="sm">
          <strong>First 3 episodes:</strong>
          {resident.episodes &&
            resident.episodes.map((episode, index) => (
              <Box as="div" key={index}>
                <Link href={resident.url} isExternal fontWeight="light">
                  {episode?.url}
                </Link>
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
};

export default CardUi;
