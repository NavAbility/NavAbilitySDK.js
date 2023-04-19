import { gql } from '@apollo/client';

import { NavAbilityClient } from '../entities/NavAbilityClient';
import {
  MUTATION_CREATE_UPLOAD,
  MUTATION_ABORT_UPLOAD,
  MUTATION_COMPLETE_UPLOAD,
} from '../graphql/QueriesDeprecated';
import { BlobInput, UploadInfo, CompletedUploadInput, Blob } from '../entities/Blob';
import { MUTATION_CREATE_DOWNLOAD, QUERY_BLOBS } from '../graphql/Blob';

export async function queryBlobs(navAbilityClient: NavAbilityClient): Promise<Blob[]> {
  try {
    const result = await navAbilityClient.query({
      fetchPolicy: 'network-only',
      query: gql(QUERY_BLOBS),
    });
    return result.data.blobs;
  } catch (e) {
    return [];
  }
}

export async function getDownloadUrl(navAbilityClient: NavAbilityClient, blobId: string) {
  const result = await navAbilityClient.mutate({
    mutation: gql(MUTATION_CREATE_DOWNLOAD),
    variables: { blobId },
  });
  return result.data.url;
}

export async function createUpload(
  navAbilityClient: NavAbilityClient,
  blob: BlobInput,
  parts: number,
): Promise<UploadInfo> {
  const result = await navAbilityClient.mutate({
    mutation: gql(MUTATION_CREATE_UPLOAD),
    variables: {
      blob,
      parts,
    },
  });
  return result.data.createUpload;
}

export async function abortUpload(navAbilityClient: NavAbilityClient, blobId: string, uploadId: string) {
  await navAbilityClient.mutate({
    mutation: gql(MUTATION_ABORT_UPLOAD),
    variables: {
      blobId,
      uploadId,
    },
  });
}

export async function completeUpload(
  navAbilityClient: NavAbilityClient,
  blobId: string,
  completedUpload: CompletedUploadInput,
) {
  await navAbilityClient.mutate({
    mutation: gql(MUTATION_COMPLETE_UPLOAD),
    variables: {
      blobId,
      completedUpload,
    },
  });
}
