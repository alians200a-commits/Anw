import assert from 'node:assert/strict';
import test from 'node:test';
import { isSafePublishedMediaUrlForBase, isSafeSlug, isSafeStoragePath } from '../../src/utils/security';
import { isAdminRole } from '../../src/admin/adminTypes';

test('slugs accept only the narrow public format', () => {
  assert.equal(isSafeSlug('propofol'), true);
  assert.equal(isSafeSlug('rapid-sequence-1'), true);
  assert.equal(isSafeSlug('../admin'), false);
  assert.equal(isSafeSlug('Propofol'), false);
  assert.equal(isSafeSlug(' propofol '), false);
  assert.equal(isSafeSlug('javascript:alert(1)'), false);
});

test('storage paths reject traversal and control characters', () => {
  assert.equal(isSafeStoragePath('admin/drugs/image.webp'), true);
  assert.equal(isSafeStoragePath('../image.webp'), false);
  assert.equal(isSafeStoragePath('admin/../image.webp'), false);
  assert.equal(isSafeStoragePath('/absolute/image.webp'), false);
  assert.equal(isSafeStoragePath('admin\\image.webp'), false);
  assert.equal(isSafeStoragePath('admin/image.webp\n'), false);
  assert.equal(isSafeStoragePath('admin/%2e%2e/image.webp'), false);
  assert.equal(isSafeStoragePath('admin/%2Fsecret.webp'), false);
});

test('published media URLs stay on the configured Supabase host and bucket', () => {
  const base = 'https://example.supabase.co';
  assert.equal(
    isSafePublishedMediaUrlForBase('https://example.supabase.co/storage/v1/object/public/content-media/drugs/a.webp', base),
    true,
  );
  assert.equal(
    isSafePublishedMediaUrlForBase('https://evil.example/storage/v1/object/public/content-media/drugs/a.webp', base),
    false,
  );
  assert.equal(
    isSafePublishedMediaUrlForBase('javascript:alert(1)', base),
    false,
  );
  assert.equal(
    isSafePublishedMediaUrlForBase('https://example.supabase.co/storage/v1/object/public/other/a.webp', base),
    false,
  );
});

test('administrative account roles are owner/admin only', () => {
  assert.equal(isAdminRole('owner'), true);
  assert.equal(isAdminRole('admin'), true);
  assert.equal(isAdminRole('editor'), false);
  assert.equal(isAdminRole('reviewer'), false);
  assert.equal(isAdminRole('user'), false);
});
