import { gql } from '@apollo/client';

import { NavAbilityClient } from '../entities/NavAbilityClient';
import {
  QUERY_FILES,
  MUTATION_CREATE_UPLOAD,
  MUTATION_ABORT_UPLOAD,
  MUTATION_COMPLETE_UPLOAD,
} from '../entities/Queries';
import { FileInput, UploadInfo, CompletedUploadInput, File } from '../entities/Blob';

export async function queryFiles(navAbilityClient: NavAbilityClient): Promise<File[]> {
  try {
    const result = await navAbilityClient.query({
      fetchPolicy: 'network-only',
      query: gql(QUERY_FILES),
    });
    return result.data.files;
  } catch (e) {
    return [];
  }
}

export async function createUpload(
  navAbilityClient: NavAbilityClient,
  file: FileInput,
  parts: number,
): Promise<UploadInfo> {
  const result = await navAbilityClient.mutate({
    mutation: gql(MUTATION_CREATE_UPLOAD),
    variables: {
      file,
      parts,
    },
  });
  return result.data.createUpload;
}

export async function abortUpload(navAbilityClient: NavAbilityClient, fileId: string, uploadId: string) {
  await navAbilityClient.mutate({
    mutation: gql(MUTATION_ABORT_UPLOAD),
    variables: {
      fileId,
      uploadId,
    },
  });
}

export async function completeUpload(
  navAbilityClient: NavAbilityClient,
  fileId: string,
  completedUpload: CompletedUploadInput,
) {
  await navAbilityClient.mutate({
    mutation: gql(MUTATION_COMPLETE_UPLOAD),
    variables: {
      fileId,
      completedUpload,
    },
  });
}
