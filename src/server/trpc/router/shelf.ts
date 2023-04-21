
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const shelfRouter = router({
  create: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.shelf.create({
          data: {
            name: input,
            userId: ctx.session.user.id
          }
        })
      } catch (e) {
        throw e;
      }
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.shelf.delete({
          where: {
            name_userId: {
              name: input,
              userId: ctx.session.user.id,
            },
          },
        })
      } catch (e) {
        throw e;
      }
    }),
  getShelves: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        return await ctx.prisma.shelf.findMany({
          where: {
            userId: ctx.session.user.id,
          },
          orderBy: {
            name: 'asc',
          },
        })
      } catch (e) {
        throw e;
      }
    }),
  getBookShelves: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.bookShelf.findMany({
          where: {
            bookId: input,
            userId: ctx.session.user.id,
          },
          select: {
            shelf: true,
          }
        }).then(res => res.map(shelf => shelf.shelf));
      } catch (e) {
        throw e;
      }
    }),
  getBooksFromShelf: protectedProcedure
    .input(z.union([z.string(), z.undefined()]))
    .query(async ({ ctx, input }) => {
      if (typeof input === 'undefined') return []
      try {
        return await ctx.prisma.bookShelf.findMany({
          where: {
            shelfId: input,
            userId: ctx.session.user.id,
          },
          select: {
            bookId: true,
          }
        }).then(res => res.map(book => book.bookId));
      } catch (e) {
        throw e;
      }
    }),
  updateBookShelves: protectedProcedure
    .input(z.object({
      bookId: z.string(),
      shelvesId: z.array(z.string()),
    }))
    .mutation(async ({ ctx, input }) => {
      const formerShelvesId = await ctx.prisma.bookShelf.findMany({
        where: {
          bookId: input.bookId,
          userId: ctx.session.user.id,
        }
      }).then(res => res.map(el => el.shelfId));

      const shelvesToAdd = input.shelvesId.filter(shelfA => !formerShelvesId.includes(shelfA));
      const shelvesToRemove = formerShelvesId.filter(shelfA => !input.shelvesId.includes(shelfA));

      try {
        if (shelvesToAdd.length > 0) {
          const data = shelvesToAdd.map(shelfId => ({
            shelfId: shelfId,
            userId: ctx.session.user.id,
            bookId: input.bookId,
          }));
          await ctx.prisma.bookShelf.createMany({
            data: data,
          });
        }
        if (shelvesToRemove.length > 0) {
          await ctx.prisma.bookShelf.deleteMany({
            where: {
              bookId: input.bookId,
              shelfId: {
                in: shelvesToRemove
              }
            }
          })
        }
      } catch (e) {
        throw e;
      }
    }),
});
